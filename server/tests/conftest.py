import pytest
import config.environment

config.environment.db_URI = 'postgres://localhost:5432/share-db-test'

from tests.lib import setup_db

setup_db()
    