"use client"
import Link from 'next/link'
import type { Route } from 'next'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function NavLink({ href, children, className, style }: NavLinkProps) {
  return (
    <Link href={href as Route} className={className} style={style}>
      {children}
    </Link>
  )
}
