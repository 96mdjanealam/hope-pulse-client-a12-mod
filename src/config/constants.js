import districtsData from "../data/districts.json";
import upazillasData from "../data/upazillas.json";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const ALL_DISTRICTS = districtsData[2]?.data || [];
export const ALL_UPAZILLAS = upazillasData[2]?.data || [];

export function getUpazillasByDistrictId(districtId) {
  return ALL_UPAZILLAS.filter((item) => item.district_id === districtId);
}

export function getUpazillasByDistrictName(districtName) {
  const district = ALL_DISTRICTS.find((item) => item.name === districtName);
  if (!district) return [];
  return getUpazillasByDistrictId(district.id);
}
