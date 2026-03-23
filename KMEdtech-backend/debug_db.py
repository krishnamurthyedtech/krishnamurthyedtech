from sqlalchemy import create_engine, text
import os

url = os.getenv('DATABASE_URL', 'postgresql://postgres:root@localhost:5432/KMEdtech_db?options=-csearch_path%3Dkmedtech_schema')
print('DB URL:', url)
engine = create_engine(url, future=True)
with engine.connect() as conn:
    print('schema exists', conn.execute(text("select schema_name from information_schema.schemata where schema_name='kmedtech_schema'")).all())
    print('tables', conn.execute(text("select table_name, table_schema from information_schema.tables where table_schema='kmedtech_schema'")).all())
    res = conn.execute(text("select count(*) from kmedtech_schema.kmedtech_conInfo")).scalar()
    print('row count', res)
