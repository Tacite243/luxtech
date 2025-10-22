-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "galleryImages" TEXT[],
    "client" TEXT NOT NULL,
    "projectDate" TIMESTAMP(3) NOT NULL,
    "projectUrl" TEXT,
    "description" TEXT NOT NULL,
    "testimonialQuote" TEXT,
    "testimonialAuthor" TEXT,
    "testimonialRole" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
