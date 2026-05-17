import { PROTECTED_ROUTES } from "@/routes/common/routePath"
import { Link } from "react-router-dom"
import { useTheme } from "@/context/theme-provider"
import brandLightIcon from "@/assets/logo/FinSight-light-favicon.svg"
import brandDarkIcon from "@/assets/logo/FinSight-dark-favicon.svg"

const Logo = (props: { url?: string }) => {
  const { theme } = useTheme()

  // Dynamically switch brand mark based on light/dark/system theme
  let activeIcon = brandLightIcon
  if (theme === "dark") {
    activeIcon = brandDarkIcon
  } else if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    activeIcon = isDark ? brandDarkIcon : brandLightIcon
  }

  return (
    <Link to={props.url || PROTECTED_ROUTES.OVERVIEW} className="flex items-center gap-2.5 select-none active:opacity-95 transition-opacity">
      <img
        src={activeIcon}
        alt="FinSight"
        className="h-6 w-6 object-contain pointer-events-none"
      />
      <span className="font-outfit font-semibold text-lg md:text-xl tracking-tight text-foreground leading-none">
        FinSight
      </span>
    </Link>
  )
}

export default Logo