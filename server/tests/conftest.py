from tests.lib import setup_db
import pytest
import config.environment

config.environment.db_URI = 'postgres://localhost:5432/share_db_test'


setup_db()
