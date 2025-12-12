export type DeviceOS = "Android" | "iOS";

export type DeviceStatus =
  | "AVAILABLE"
  | "NOT_FOUND"
  | "WIFI_DISCONNECT"
  | "HELPER_NOT_FOUND"
  | "LOW_BATTERY"
  | "VERIFICATION_REQUIRED";

export interface Device {
  device_key: string;
  device_manufacturer: string;
  device_name: string;
  device_os: DeviceOS;
  device_version: string;
  device_status: DeviceStatus;
}
