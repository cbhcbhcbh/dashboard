import React from "react";

export default function OrderLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>
        <div className="container  my-6">{children}</div>
    </>
}