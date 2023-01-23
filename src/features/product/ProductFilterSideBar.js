import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Drawer } from "@mui/material";
import ProductSideBar from "./ProductSideBar";


export default function ProductFilterSidebar({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
}) {
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        startIcon={<FilterListIcon />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="left"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: "none", overflow: "hidden" },
        }}
      >
        <ProductSideBar
          onCloseFilter={onCloseFilter}
          isOpenFilter={isOpenFilter}
        />
      </Drawer>
    </>
  );
}
