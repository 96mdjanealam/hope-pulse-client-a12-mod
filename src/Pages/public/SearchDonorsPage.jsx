import React, { useState } from "react";
import { Search, MapPin, Droplet, Users } from "lucide-react";
import useAllUsers from "../../hooks/useAllUsers";
import {
  ALL_DISTRICTS,
  BLOOD_GROUPS,
  getUpazillasByDistrictName,
} from "../../config/constants";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";

export default function SearchDonorsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazilla, setSelectedUpazilla] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const allUsers = useAllUsers();

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSelectedUpazilla("");
    setDistrictUpazillas(getUpazillasByDistrictName(districtName));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const matches = allUsers.filter(
      (user) =>
        (selectedDistrict ? user.district === selectedDistrict : true) &&
        (selectedUpazilla ? user.upazilla === selectedUpazilla : true) &&
        (selectedBloodGroup ? user.bloodGroup === selectedBloodGroup : true)
    );
    setFilteredUsers(matches);
    setHasSearched(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Search Blood Donors"
        subtitle="Find registered donors by blood group, district, and upazilla."
      />

      <Card className="mb-8">
        <search>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
          >
            <div>
              <label
                htmlFor="search-bloodGroup"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Blood Group
              </label>
              <select
                id="search-bloodGroup"
                name="bloodGroup"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-district"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                District
              </label>
              <select
                id="search-district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="">All districts</option>
                {ALL_DISTRICTS.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-upazilla"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Upazilla
              </label>
              <select
                id="search-upazilla"
                name="upazilla"
                value={selectedUpazilla}
                onChange={(e) => setSelectedUpazilla(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 disabled:bg-slate-100 focus:border-rose-500 focus:outline-none"
              >
                <option value="">All upazillas</option>
                {districtUpazillas.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search Donors
            </Button>
          </form>
        </search>
      </Card>

      {hasSearched && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Matching Donors ({filteredUsers.length})
          </h2>

          {filteredUsers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No matching donors found"
              description="Try broadening your district or upazilla filter to see more donors."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((donor) => (
                <Card key={donor._id} padding="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          donor.image ||
                          "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(donor.name || "Donor")
                        }
                        alt={donor.name}
                        className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {donor.name}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {donor.upazilla}, {donor.district}
                        </p>
                      </div>
                    </div>
                    <Badge tone="danger">
                      <Droplet className="mr-1 h-3 w-3" aria-hidden="true" />
                      {donor.bloodGroup}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
