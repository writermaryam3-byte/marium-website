import Container from "@/components/layouts/Container";
import CartItems from "./_components/CartItems";
import CheckoutForm from "./_components/CheckoutForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Cart = async() => {
  const session = await getServerSession(authOptions);


  return (
    <main>
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full md:w-fit">
            <CartItems />
           
          </div>
          <CheckoutForm user={session?.user} />
        </div>
      </Container>
    </main>
  );
};

export default Cart;
