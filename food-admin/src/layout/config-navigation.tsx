import SvgColor from "@/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Дашбоард",
    path: "/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "Хэрэглэгчид",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "Хоол",
    path: "/food",
    icon: icon("ic_cart"),
  },
  {
    title: "Ангилал",
    path: "/category",
    icon: icon("ic_blog"),
  },
];

export default navConfig;
