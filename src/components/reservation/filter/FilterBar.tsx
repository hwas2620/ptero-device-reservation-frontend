import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import type { BaseReservationFilter } from "@/types/reservationFilters";
import { getFilterLabels } from "./filterLabel";
import FilterTag from "./FilterTag";

interface Props<T extends BaseReservationFilter> {
  filters: T;
  defaultFilter: T;
  onChange: (next: T) => void;

  children: (draft: T, setDraft: (next: T) => void) => React.ReactNode;
}

export default function FilterBar<T extends BaseReservationFilter>({
  filters,
  onChange,
  defaultFilter,
  children,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<T>(filters);

  const labelList = getFilterLabels(filters);

  const handleOpen = () => {
    setDraft(filters);
    setOpen(true);
  };

  const handleCancel = () => {
    setDraft(filters);
    setOpen(false);
  };

  const handleApply = () => {
    onChange(draft);
    setOpen(false);
  };

  const handleClear = () => {
    setDraft(defaultFilter);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen}
        sx={{ height: 32, borderRadius: 2 }}
      >
        필터
      </Button>

      {/* 활성 필터 태그들 (applied 기준) */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        {labelList.map(({ key, label }) => (
          <FilterTag
            key={key}
            label={label}
            onDelete={() => {
              if (key === "os") {
                onChange({ ...filters, os: [] });
                return;
              }
              onChange({ ...filters, [key]: null });
            }}
          />
        ))}

        {labelList.length > 0 && (
          <Typography
            sx={{ color: "#999", fontSize: 14, cursor: "pointer" }}
            onClick={() => onChange(defaultFilter)}
          >
            전체 삭제
          </Typography>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleCancel}
        PaperProps={{ sx: { width: 380, p: 3 } }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>필터</Typography>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }}>{children(draft, setDraft)}</Box>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid #E0E0E0",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button sx={{ mr: "auto" }} onClick={handleClear}>
            전체 삭제
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="contained" onClick={handleApply}>
            적용
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
