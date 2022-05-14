import sqlalchemy
from sqlalchemy.orm import declarative_base

__factory = None
SqlAlchemyBase = declarative_base()


def global_init():
    global __factory
    if __factory:
        return

    conn_str = f"sqlite:///test.sqlite3?check_same_thread=False"
    engine = sqlalchemy.create_engine(conn_str)
    __factory = sqlalchemy.orm.sessionmaker(bind=engine)
    import backend.app.db.models

    SqlAlchemyBase.metadata.create_all(engine)


def get_session():
    return __factory()
