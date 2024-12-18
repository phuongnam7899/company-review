"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { StarInput } from "@/components/common";
import { Provider } from "react-redux";
import store from "@/store";

const companies = [
  {
    id: 1,
    logo: "https://play-lh.googleusercontent.com/xH4QFNdQcEOELtR2XyDxhMCka1q5PTEgY40LSGYVoT7fkbmAnPfA8LFYac7hmolnCRg=w240-h480-rw",
    name: "Yody",
    description: "Chuyên cung cấp nhân viên giá rẻ dịp cuối năm",
    rating: 4,
  },
  {
    id: 2,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOfEGbR6U-dPgsKO0Ng01-T_jw94r8wwuTw&s",
    name: "VNG",
    description: "Description for company two.",
    rating: 5,
  },
  {
    id: 3,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOfEGbR6U-dPgsKO0Ng01-T_jw94r8wwuTw&s",
    name: "VNG",
    description: "Description for company two.",
    rating: 5,
  },
  {
    id: 4,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOfEGbR6U-dPgsKO0Ng01-T_jw94r8wwuTw&s",
    name: "VNG",
    description: "Description for company two.",
    rating: 5,
  },
  {
    id: 5,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOfEGbR6U-dPgsKO0Ng01-T_jw94r8wwuTw&s",
    name: "VNG",
    description: "Description for company two.",
    rating: 5,
  },
];

export interface Company {
  id: number;
  logo: string;
  name: string;
  description: string;
  rating: number;
}

function CompanyItem({ company }: { company: Company }) {
  return (
    <Link href={"/company-reviews/" + company.id}>
      <div className="border border-gray-300 p-4 mb-4 rounded flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-12 h-12 mb-2"
        />
        <div className="">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-bold">{company.name}</h2>
            <StarInput value={company.rating} />
          </div>
          <p className="mb-2">{company.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-1/2 m-auto">
      <h1 className="text-6xl bold text-center mb-8 mt-6">(Chắc) Vui Congty</h1>
      <Input
        type="text"
        placeholder="Tìm công ty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-6 w-full border border-gray-300 rounded "
      />
      <div>
        {filteredCompanies.map((company) => (
          <CompanyItem key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
