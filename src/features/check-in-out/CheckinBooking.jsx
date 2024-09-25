import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionsBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakfast) {
      const breakfast = {
        extrasPrice: optionsBreakfastPrice,
        hasBreakfast: true,
        totalPrice: totalPrice + optionsBreakfastPrice,
      };
      checkin({ bookingId, breakfast });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmedPaid}
          disabled={confirmedPaid || isCheckingIn}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionsBreakfastPrice)}
                
              (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionsBreakfastPrice
              )})`}
        </Checkbox>{" "}
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={addBreakfast || isCheckingIn}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((confirm) => !confirm);
              setConfirmedPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionsBreakfastPrice)}?
          </Checkbox>{" "}
        </Box>
      )}

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmedPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
