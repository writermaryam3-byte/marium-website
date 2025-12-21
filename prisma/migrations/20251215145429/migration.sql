-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "streetAddress" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "deliveryFee" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "userEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderCourse" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderCourse" ADD CONSTRAINT "OrderCourse_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCourse" ADD CONSTRAINT "OrderCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCourse" ADD CONSTRAINT "OrderCourse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
