from models.user import User
from models.item import Item
from models.booking import Booking
from datetime import date, timedelta


def generate_bookings(user_list, item_list):
    return[
        Booking(
            owner_id=user_list[0].id,
            borrower_id=user_list[1].id,
            item_id=item_list[0].id,
            start_date=date.today(),
            end_date=date.today()+timedelta(days=10),
            owner_decision=True,
            borrower_decision=True,
            approval_status=True
        ),
        Booking(
            owner_id=user_list[1].id,
            borrower_id=user_list[3].id,
            item_id=item_list[1].id,
            start_date=date.today(),
            end_date=date.today()+timedelta(days=5),
            owner_decision=True,
            borrower_decision=True,
            approval_status=True
        ),
        Booking(
            owner_id=user_list[0].id,
            borrower_id=user_list[1].id,
            item_id=item_list[2].id,
            start_date=date.today(),
            end_date=date.today()+timedelta(days=20),
            owner_decision=True,
            borrower_decision=True,
            approval_status=True
        )

    ]