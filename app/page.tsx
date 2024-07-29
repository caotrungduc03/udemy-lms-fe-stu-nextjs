'use client';
import Image from 'next/image';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      <section className="mb-12">
        <div className="relative max-w-[1340px] mx-auto">
          <Image
            src="/images/banner-1.jpg"
            width={1340}
            height={400}
            alt="Banner 1"
          />
          <div className="absolute top-16 left-[72px] max-w-[440px] shadow-lg p-6 bg-white">
            <h1 className="text-4xl font-bold mb-2">Learning that gets you</h1>
            <p className="text-base">
              Skills for your present (and your future). Get started with us.
            </p>
          </div>
          <div className="absolute top-48 -translate-y-2/4 flex justify-between w-full px-4">
            <button className="btn btn-medium btn-round btn-primary heading-sm btn-icon btn-icon-medium">
              <MdChevronLeft className="icon icon-large" />
            </button>
            <button className="btn btn-medium btn-round btn-primary heading-sm btn-icon btn-icon-medium">
              <MdChevronRight className="icon icon-large" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
