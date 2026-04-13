import { Fragment } from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

interface BreadcrumbCrumb {
  label: string
  href: string
}

interface BreadcrumbNavProps {
  crumbs: BreadcrumbCrumb[]
}

export function BreadcrumbNav({ crumbs }: BreadcrumbNavProps) {
  if (crumbs.length === 0) return null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item:
        index < crumbs.length - 1
          ? `${SITE_URL}${crumb.href}`
          : undefined,
    })),
  }

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1

            return (
              <Fragment key={crumb.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={crumb.href} />}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
