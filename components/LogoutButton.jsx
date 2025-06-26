'use client'

import { signout } from "@/lib/actions/auth.actions"
import { Button } from "./ui/button"

const LogoutButton = () => {
    return (
        <Button size="sm" onClick={() => signout()}>Sign Out</Button>
    )
}

export default LogoutButton