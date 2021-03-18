from flask import Blueprint, request, g
from models.booking import Booking
from models.user import User
from decorators.secure_route import secure_route
from marshmallow.exceptions import ValidationError

from serializers.booking import BookingSchema

booking_schema = BookingSchema()

router = Blueprint(__name__, 'bookings')


@router.route("/bookings", methods=["GET"])
def get_all_bookings():
    bookings = Booking.query.all()
    return booking_schema.jsonify(bookings, many=True), 200


@router.route("/bookings/<int:booking_id>", methods=["GET"])
def get_single_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if not booking:
        return{"message": "Booking not found"}, 404
    return booking_schema.jsonify(booking), 200


@router.route("/bookings", methods={"POST"})
@secure_route
def create_booking():
    booking_dictionary = request.json
    try:
        booking = booking_schema.load(booking_dictionary)
        booking.user_id = g.current_user.id
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    booking.save()
    return booking_schema.jsonify(booking), 200

@router.route('/users/<int:user_id>/borrowings', methods=['GET'])
def get_user_borrowing_agreements(user_id):
    bookings = Booking.query.all()
    user = User.query.get(user_id)
    borrowed_items = []
    for booking in bookings:
        if booking.borrower_id == user.id:
            borrowed_items.append(booking)

    return booking_schema.jsonify(borrowed_items, many=True), 200

@router.route("/bookings/<int:booking_id>", methods=["PUT"])
@secure_route
def update_booking(booking_id):
    existing_booking = Booking.query.get(booking_id)
    if existing_booking.owner_id != g.current_user.id: # TODO add borrower_id
        return { 'message': 'Unauthorized'}
    booking_dictionary = request.json
    try:
        booking = booking_schema.load(
            booking_dictionary,
            instance=existing_booking,
            partial=True
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    booking.save()
    return booking_schema.jsonify(booking), 201


@router.route("/booking/<int:booking_id>", methods=["DELETE"])
@secure_route
def remove_booking(booking_id):
    booking = Booking.query.get(booking_id)
    if booking.user_id != g.current_user.id:
        return {'errors': 'This is not your booking!'}, 402
    booking.remove()
    return {"message": "booking deleted successfully"}, 200
