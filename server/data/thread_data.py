from models.thread import Thread
from models.message import Message


def generate_threads(user_list):
    return [
        Thread(
            users=[
                user_list[0],
                user_list[1]
            ],
            messages=[
                Message(content=f'Hi {user_list[1].first_name}', user_id=user_list[0].id),
                Message(content=f'Hi {user_list[0].first_name}', user_id=user_list[1].id),
                Message(content='Can I borrow your ladder please?', user_id=user_list[0].id)
            ]
        ),
        Thread(
            users=[
                user_list[0],
                user_list[2]
            ],
            messages=[
                Message(content=f'Hi {user_list[0].first_name}', user_id=user_list[2].id),
                Message(content=f'Hi {user_list[2].first_name}', user_id=user_list[0].id),
                Message(content='Can I borrow your speakers please?', user_id=user_list[2].id)
            ]
        )

    ]
