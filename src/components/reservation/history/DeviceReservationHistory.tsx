import { Box } from "@mui/material";
import { useState } from "react";
import FilterBar from "@/components/reservation/filter/FilterBar";
import HistoryFilterForm from "@/components/reservation/filter/forms/HistoryFilterForm";
import HistoryTable from "./HistoryTable";
import HistoryPagination from "./HistoryPagination";
import { useDevices } from "@/hooks/useDevices";
import { useHistoryReservations } from "@/hooks/useHistoryReservations";
import { defaultHistoryFilter } from "@/types/reservationFilters";

export default function DeviceReservationHistory() {
  const [filters, setFilters] = useState(defaultHistoryFilter);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: devices = [] } = useDevices();
  const { data: rows = [] } = useHistoryReservations(filters, devices);

  const total = rows.length;
  const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box>
      {/* 필터 */}
      <FilterBar
        filters={filters}
        defaultFilter={defaultHistoryFilter}
        onChange={(next) => {
          setFilters(next);
          setPage(1); // 필터 변경 시 페이지 리셋
        }}
      >
        {(draft, setDraft) => (
          <HistoryFilterForm
            filters={draft}
            onChange={setDraft}
            devices={devices}
          />
        )}
      </FilterBar>

      {/* 테이블 */}
      <Box sx={{ mt: 2 }}>
        <HistoryTable rows={pagedRows} />
      </Box>

      {/* 페이지네이션 */}
      <HistoryPagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Box>
  );
}
