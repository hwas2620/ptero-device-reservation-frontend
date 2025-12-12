import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

const NOW = dayjs();

// 기준 날짜
const today = dayjs("2025-12-12");

// 기간 설정
const startDate = today.subtract(15, "day");
const endDate = today.add(15, "day");

// 유저 리스트
const users = ["jm", "guest", "tester01", "tester02", "qa", "developer"];

const devices = [
  {
    device_key: "galaxy_s25_ultra",
    device_manufacturer: "Samsung",
    device_name: "Galaxy S25 Ultra",
    device_os: "Android",
    device_version: "14",
    device_status: "AVAILABLE",
  },
  {
    device_key: "galaxy_s24",
    device_manufacturer: "Samsung",
    device_name: "Galaxy S24",
    device_os: "Android",
    device_version: "13",
    device_status: "LOW_BATTERY",
  },
  {
    device_key: "galaxy_s23",
    device_manufacturer: "Samsung",
    device_name: "Galaxy S23",
    device_os: "Android",
    device_version: "13",
    device_status: "AVAILABLE",
  },
  {
    device_key: "galaxy_note20",
    device_manufacturer: "Samsung",
    device_name: "Galaxy Note20",
    device_os: "Android",
    device_version: "12",
    device_status: "WIFI_DISCONNECT",
  },
  {
    device_key: "iphone_16_pro",
    device_manufacturer: "Apple",
    device_name: "iPhone 16 Pro",
    device_os: "iOS",
    device_version: "17.3",
    device_status: "AVAILABLE",
  },
  {
    device_key: "iphone_15",
    device_manufacturer: "Apple",
    device_name: "iPhone 15",
    device_os: "iOS",
    device_version: "17.1",
    device_status: "HELPER_NOT_FOUND",
  },
  {
    device_key: "iphone_14",
    device_manufacturer: "Apple",
    device_name: "iPhone 14",
    device_os: "iOS",
    device_version: "16.5",
    device_status: "AVAILABLE",
  },
  {
    device_key: "iphone_13",
    device_manufacturer: "Apple",
    device_name: "iPhone 13",
    device_os: "iOS",
    device_version: "15.4",
    device_status: "AVAILABLE",
  },
  {
    device_key: "pixel_8_pro",
    device_manufacturer: "Google",
    device_name: "Pixel 8 Pro",
    device_os: "Android",
    device_version: "14",
    device_status: "AVAILABLE",
  },
  {
    device_key: "pixel_7",
    device_manufacturer: "Google",
    device_name: "Pixel 7",
    device_os: "Android",
    device_version: "13",
    device_status: "VERIFICATION_REQUIRED",
  },
  {
    device_key: "xiaomi_14",
    device_manufacturer: "Xiaomi",
    device_name: "Xiaomi 14",
    device_os: "Android",
    device_version: "14",
    device_status: "AVAILABLE",
  },
  {
    device_key: "xiaomi_mi11",
    device_manufacturer: "Xiaomi",
    device_name: "Mi 11",
    device_os: "Android",
    device_version: "12",
    device_status: "LOW_BATTERY",
  },
  {
    device_key: "iphone_xr",
    device_manufacturer: "Apple",
    device_name: "iPhone XR",
    device_os: "iOS",
    device_version: "16.3",
    device_status: "AVAILABLE",
  },
  {
    device_key: "iphone_se3",
    device_manufacturer: "Apple",
    device_name: "iPhone SE 3rd",
    device_os: "iOS",
    device_version: "16.0",
    device_status: "AVAILABLE",
  },
];

let reservations = [];
let id = 1;

for (
  let d = startDate;
  d.isBefore(endDate) || d.isSame(endDate);
  d = d.add(1, "day")
) {
  const count = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < count; i++) {
    const hour = 8 + Math.floor(Math.random() * 10);
    const duration = Math.random() > 0.5 ? 1 : 2;

    const start = d.hour(hour).minute(0).second(0);
    const end = start.add(duration, "hour");

    let determinedStatus;
    if (end.isBefore(NOW)) {
      determinedStatus = "COMPLETED";
    } else {
      determinedStatus = "RESERVED";
    }

    reservations.push({
      id: id++,
      device_key:
        devices[Math.floor(Math.random() * devices.length)].device_key,
      user: users[Math.floor(Math.random() * users.length)],
      start_time: start.format("YYYY-MM-DDTHH:mm:00"),
      end_time: end.format("YYYY-MM-DDTHH:mm:00"),
      status: determinedStatus,
    });
  }
}

console.log(JSON.stringify({ devices, reservations }, null, 2));
