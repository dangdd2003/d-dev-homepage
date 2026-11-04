import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const ALLOWED_HOSTS = ['old.dangdd.dev'] as const
export type AllowedHost = (typeof ALLOWED_HOSTS)[number]

const DEFAULT_HOST: AllowedHost = 'old.dangdd.dev'

export interface LegacyPageProps {
  cookies: string
  baseUrl: string
}

export function getServerSideProps({
  req
}: GetServerSidePropsContext): GetServerSidePropsResult<LegacyPageProps> {
  const forwardedHost = req.headers['x-forwarded-host']
  const rawHost =
    (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) ||
    req.headers.host ||
    DEFAULT_HOST
  const forwardedProto = req.headers['x-forwarded-proto']
  const rawProtocol =
    (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) ||
    'https'
  const host = (rawHost.split(',')[0] ?? '').trim()
  const protocol = (rawProtocol.split(',')[0] ?? 'https').trim()
  const bareHost = host.replace(/^www\./, '').split(':')[0] ?? ''
  const validatedHost =
    ALLOWED_HOSTS.find((h): h is AllowedHost => bareHost === h) ?? DEFAULT_HOST
  return {
    props: {
      cookies: req.headers.cookie ?? '',
      baseUrl: `${protocol}://${validatedHost}`
    }
  }
}
