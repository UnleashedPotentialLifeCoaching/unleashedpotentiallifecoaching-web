import Link from 'next/link';

const FOOTER_LINKS = [
  {
    slug: '/services',
    label: 'Services',
  },
  {
    slug: '/disclaimer',
    label: 'Disclaimer',
  },
  {
    slug: '/sitemap.xml',
    label: 'Sitemap',
  },
];

const SubFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-black mt-12 h-4 flex flex-col sm:flex-row sm:justify-between">
      <p className="mt-4 text-forrest">Unleashed Potential ©️ {year}</p>
      <ul className="mt-4 flex">
        {FOOTER_LINKS.map(({ slug, label }) => (
          <li key={label}>
            <Link href={slug}>
              <a className="font-serif text-forrest italic mx-4 hover:underline text-lg">
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubFooter;
