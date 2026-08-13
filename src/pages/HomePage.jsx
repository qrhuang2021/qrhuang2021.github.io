import { FaGithub } from 'react-icons/fa'
import { HiOutlineDocumentText, HiOutlineEnvelope } from 'react-icons/hi2'
import { SiGooglescholar } from 'react-icons/si'
import profileImage from '../assets/profile.webp'
import { profile } from '../content/profile.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const profileLinkIcons = {
  cv: HiOutlineDocumentText,
  email: HiOutlineEnvelope,
  github: FaGithub,
  googleScholar: SiGooglescholar,
}

function BiographyLink({ children, href }) {
  return (
    <a
      className="font-medium text-academic-700 underline decoration-academic-200 transition-colors hover:decoration-academic-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

function ProfileLink({ link }) {
  const Icon = profileLinkIcons[link.icon]
  const className =
    'inline-flex min-h-10 items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600'

  if (!link.href) {
    return (
      <span
        aria-disabled="true"
        className={`${className} cursor-not-allowed text-slate-400`}
        title={`${link.label} coming soon`}
      >
        <Icon aria-hidden="true" className="size-5" />
        {link.label}
        <span className="sr-only"> (coming soon)</span>
      </span>
    )
  }

  const externalProps = link.external
    ? { rel: 'noreferrer', target: '_blank' }
    : {}

  return (
    <a
      className={`${className} text-slate-600 hover:bg-academic-50 hover:text-academic-700`}
      href={link.href}
      {...externalProps}
    >
      <Icon aria-hidden="true" className="size-5" />
      {link.label}
    </a>
  )
}

function HomePage() {
  useDocumentTitle()

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-academic-900 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            I am a {profile.stage} at the{' '}
            <BiographyLink href={profile.affiliation.lab.href}>
              {profile.affiliation.lab.label}
            </BiographyLink>
            ,{' '}
            <BiographyLink href={profile.affiliation.university.href}>
              {profile.affiliation.university.label}
            </BiographyLink>
            , advised by{' '}
            <BiographyLink href={profile.advisor.href}>
              {profile.advisor.label}
            </BiographyLink>
            . My research focuses on structured 3D reconstruction, particularly
            for CAD models and urban environments. Before that, I received my
            bachelor&apos;s and master&apos;s degrees from{' '}
            <BiographyLink href={profile.previousInstitution.href}>
              {profile.previousInstitution.label}
            </BiographyLink>
            .
          </p>

          <nav
            aria-label="Academic profiles and contact"
            className="mt-7 grid grid-cols-[max-content_max-content] gap-x-2 gap-y-1 sm:flex sm:flex-wrap"
          >
            {profile.links.map((link) => (
              <ProfileLink key={link.label} link={link} />
            ))}
          </nav>
        </div>

        <img
          alt={`${profile.name} portrait`}
          className="size-40 justify-self-center rounded-3xl border border-academic-200 object-cover shadow-sm sm:size-48 md:justify-self-auto lg:size-56"
          decoding="async"
          fetchPriority="high"
          height="224"
          src={profileImage}
          width="224"
        />
      </div>

      <div className="mt-14 border-t border-slate-200 pt-8 sm:mt-20 sm:pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Research interests
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-base font-medium text-slate-700">
          {profile.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomePage
