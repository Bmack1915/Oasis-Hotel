/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1. Num bookings
  const numBookings = bookings.length;

  //2. Total sales
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3. Total check ins
  const totalCheckIns = confirmedStays.length;

  //4. Occupancy Rate
  //How many beds filled in last 90 days out of all bes

  //Guests have stayed in hotel a total of =
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  //Number of nights that could have been sold = number of days filtered by * number of cabins (i,e, possible days that could be sold. )

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
export default Stats;
