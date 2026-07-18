import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await prisma.profile.findFirst().catch(() => null);

  return (
    <>
      <Navbar resumeUrl={profile?.resumeUrl ?? undefined} />
      <main className="flex-1">{children}</main>
      <Footer
        github={profile?.github ?? "https://github.com/AdelereKehinde"}
        linkedin={profile?.linkedin ?? "https://linkedin.com/in/AdelereKehinde"}
        twitter={profile?.twitter ?? "https://x.com/AdelereKehinde"}
        email={profile?.email ?? "adelerekehinde01@gmail.com"}
      />
    </>
  );
}
