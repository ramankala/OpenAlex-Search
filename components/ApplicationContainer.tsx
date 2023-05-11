import {
    AppShell,
    Footer,
    Group,
    Header,
    Text
} from "@mantine/core"
import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

export const ApplicationContainer = ({children,...props}: Props) => {
    return(
        <AppShell>
            {children}
        </AppShell>
    )
}