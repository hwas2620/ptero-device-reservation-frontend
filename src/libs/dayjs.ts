import dayjs from "dayjs";
import "dayjs/locale/ko";
import isBetween from "dayjs/plugin/isBetween";

dayjs.locale("ko");
dayjs.extend(isBetween);

export default dayjs;
