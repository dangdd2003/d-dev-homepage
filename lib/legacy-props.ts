import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const ALLOWED_HOSTS = ['dangdd.tech', 'dangdd.dev', 'ddangw.me'] as const
export type AllowedHost = (typeof ALLOWED_HOSTS)[number]

export interface LegacyPageProps {
  cookies: string
  baseUrl: string
}

export function getServerSideProps({
  req
}: GetServerSidePropsContext): GetServerSidePropsResult<LegacyPageProps> {
  const rawHost =
    (req.headers['x-forwarded-host'] as string) ||
    (req.headers.host as string) ||
    'dangdd.dev'
  const rawProtocol = (req.headers['x-forwarded-proto'] as string) || 'https'
  const host = (rawHost.split(',')[0] ?? '').trim()
  const protocol = (rawProtocol.split(',')[0] ?? 'https').trim()
  const bareHost = host.replace(/^www\./, '').split(':')[0] ?? ''
  const validatedHost =
    ALLOWED_HOSTS.find((h): h is AllowedHost => bareHost === h) ?? 'dangdd.dev'
  return {
    props: {
      cookies: req.headers.cookie ?? '',
      baseUrl: `${protocol}://www.${validatedHost}`
    }
  }
}
