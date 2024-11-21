import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

const Header = ({ onLogout, setActivePage }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        GEU
      </h1>
      <nav className="flex space-x-4">
        <Button variant="ghost" onClick={() => setActivePage('dashboard')}>Home</Button>
        <Button variant="ghost" onClick={() => setActivePage('about')}>About</Button>
        <Button variant="ghost" onClick={() => setActivePage('contact')}>Contact Us</Button>
        <Button variant="ghost" onClick={() => setActivePage('services')}>Services</Button>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Header; 