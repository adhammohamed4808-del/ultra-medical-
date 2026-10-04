from pathlib import Path
import shutil
from datetime import datetime

PROJECT_DIR = Path(r"D:\WEDOCODE\WeDoCode Projects\ULTRA MEDICAL\Webcodes")
AR_DIR = PROJECT_DIR / "ar"

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
BACKUP_DIR = PROJECT_DIR / f"_backup_removed_ar_pages_{timestamp}"

if AR_DIR.exists() and AR_DIR.is_dir():
    # Backup Arabic pages before deletion
    shutil.copytree(AR_DIR, BACKUP_DIR)

    # Remove Arabic pages folder
    shutil.rmtree(AR_DIR)

    print("DONE")
    print(f"Arabic pages removed from:\n{AR_DIR}")
    print(f"Backup saved here:\n{BACKUP_DIR}")
else:
    print("No Arabic folder found. Nothing removed.")