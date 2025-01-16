-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "current_role" TEXT,
    "preferred_job_types" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "headline" TEXT,
    "summary" TEXT,
    "contact" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_experience" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resume_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "resume_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_education" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resume_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ,
    "gpa" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "resume_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "category" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_skill" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resume_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "resume_user_id_idx" ON "resume"("user_id");

-- CreateIndex
CREATE INDEX "resume_experience_resume_id_idx" ON "resume_experience"("resume_id");

-- CreateIndex
CREATE INDEX "resume_education_resume_id_idx" ON "resume_education"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "skill_name_key" ON "skill"("name");

-- CreateIndex
CREATE INDEX "resume_skill_resume_id_idx" ON "resume_skill"("resume_id");

-- CreateIndex
CREATE INDEX "resume_skill_skill_id_idx" ON "resume_skill"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "resume_skill_resume_id_skill_id_key" ON "resume_skill"("resume_id", "skill_id");

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_experience" ADD CONSTRAINT "resume_experience_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_education" ADD CONSTRAINT "resume_education_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_skill" ADD CONSTRAINT "resume_skill_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_skill" ADD CONSTRAINT "resume_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
