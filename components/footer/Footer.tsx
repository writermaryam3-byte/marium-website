import {
  FaXTwitter,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa6";
import { Button } from "../ui/button";
import Container from "../layouts/Container";
import Link from "../link";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <footer className="pb-10">
      <Container>
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="text-sm leading-relaxed">
            <p>
              نقدم لك مواد وتمارين تساعدك على تجاوز التحديات وتمنحك فهم أعمق
              لذاتك. نحن هنا لدعم رحلتك نحو التغيير.
            </p>
            <p className="mt-3">
              لتعيش مع أفضل نسخة من نفسك في واقع مميز يشبهك ويعبر عنك.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-lg">روابط مهمة</h3>

            <div className="space-y-2 text-sm">
              <Link
                href="/contact"
                className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
              >
                ← تواصل معنا
              </Link>

              <Link
                href="/privacy-policy"
                className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
              >
                ← سياسة الخصوصية
              </Link>

              <Link
                href="/terms"
                className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
              >
                ← الشروط والأحكام
              </Link>

              <Link
                href="/faq"
                className="flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
              >
                ← الأسئلة الشائعة
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-lg">النشرة البريدية</h3>
            <Newsletter />
          </div>
        </div>

        <div className="bg-pink-500">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Payment Icons */}
            <div className="flex items-center gap-4 flex-wrap">
              <img src="/payments/tabby.svg" alt="tabby" className="h-6" />
              <img src="/payments/tamara.svg" alt="tamara" className="h-6" />
              <img src="/payments/mada.svg" alt="mada" className="h-6" />
              <img
                src="/payments/applepay.svg"
                alt="apple pay"
                className="h-6"
              />
              <img
                src="/payments/mastercard.svg"
                alt="mastercard"
                className="h-6"
              />
              <img src="/payments/visa.svg" alt="visa" className="h-6" />
              <img src="/payments/vat.svg" alt="vat" className="h-6" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon link="https://x.com/mariamtalentt?s=21">
                <FaXTwitter />
              </SocialIcon>
              <SocialIcon link="https://t.me/mariamtalent">
                <FaTelegram />
              </SocialIcon>
              <SocialIcon link="https://www.linkedin.com/in/%D9%85%D8%B1%D9%8A%D9%85-%D8%A7%D9%84%D9%85%D8%B7%D9%8A%D8%B1%D9%8A-6a51ba253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                <FaLinkedin />
              </SocialIcon>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const SocialIcon = ({
  children,
  link,
}: {
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white text-black p-2 rounded-md cursor-pointer hover:scale-105 transition">
      <Link target="_balnk" href={link}>{children}</Link>
    </div>
  );
};

export default Footer;
