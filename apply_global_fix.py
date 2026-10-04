from pathlib import Path
import shutil

PROJECT_DIR = Path(r"D:\WEDOCODE\WeDoCode Projects\ULTRA MEDICAL\Webcodes")

CSS_LINE = '<link rel="stylesheet" href="assets/global-fix.css">'
JS_LINE = '<script src="assets/security.js"></script>'

html_files = list(PROJECT_DIR.glob("*.html"))

backup_dir = PROJECT_DIR / "_backup_before_global_fix"
backup_dir.mkdir(exist_ok=True)

updated = []
skipped = []

for file_path in html_files:
    text = file_path.read_text(encoding="utf-8", errors="ignore")

    # Backup first
    backup_file = backup_dir / file_path.name
    if not backup_file.exists():
        shutil.copy2(file_path, backup_file)

    original_text = text

    # Add CSS before </head>
    if CSS_LINE not in text:
        if "</head>" in text:
            text = text.replace("</head>", f"  {CSS_LINE}\n</head>", 1)
        else:
            print(f"WARNING: </head> not found in {file_path.name}")

    # Add JS before </body>
    if JS_LINE not in text:
        if "</body>" in text:
            text = text.replace("</body>", f"  {JS_LINE}\n</body>", 1)
        else:
            print(f"WARNING: </body> not found in {file_path.name}")

    if text != original_text:
        file_path.write_text(text, encoding="utf-8")
        updated.append(file_path.name)
    else:
        skipped.append(file_path.name)

print("\nDONE")
print(f"Updated files: {len(updated)}")
for name in updated:
    print("UPDATED:", name)

print(f"\nSkipped/no change files: {len(skipped)}")
for name in skipped:
    print("SKIPPED:", name)

print(f"\nBackup saved here:\n{backup_dir}")