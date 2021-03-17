import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/share_db')
secret = os.getenv('SECRET', 'asdfjaspoifejknm;dz;lkopiajfdskoakjlladsj;f')
