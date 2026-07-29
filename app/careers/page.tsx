import LifeGallery from "../_home-components/LifeGallery";
import { CareersHero } from "./_components/CareersHero";
import { StatsStrip } from "./_components/StatsStrip";
import { WhyJoinSection } from "./_components/WhyJoinSection";
import { OpenRolesSection } from "./_components/open-roles-section";
import { CareersCta } from "./_components/CareersCta";
import { careersPageContent } from "./_data/careers-data";

export default function CareersPage() {
  return (
    <>
      <CareersHero content={careersPageContent.hero} />
      <StatsStrip stats={careersPageContent.stats} />
      <WhyJoinSection heading={careersPageContent.whyJoin.heading} benefits={careersPageContent.benefits} />
      <OpenRolesSection filters={careersPageContent.filters} roles={careersPageContent.roles} />
      <LifeGallery
        id="life"
        variant="careers"
        heading={careersPageContent.lifeAtTechGrit.heading}
        description={careersPageContent.lifeAtTechGrit.description}
        images={careersPageContent.lifeAtTechGrit.images}
        columns={4}
      />
      <CareersCta content={careersPageContent.cta} />
    </>
  );
}
