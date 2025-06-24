import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to My Portfolio</h1>
          <p className="text-xl text-gray-600 mb-12">Frontend Developer passionate about creating beautiful and functional web experiences</p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <Card>
            <h3 className="text-xl font-semibold mb-4">React & Next.js</h3>
            <p className="text-gray-600 mb-4">Modern web development with React and Next.js framework</p>
            <Button variant="primary" size="sm">
              Learn More
            </Button>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-4">TypeScript</h3>
            <p className="text-gray-600 mb-4">Type-safe development for better code quality and maintainability</p>
            <Button variant="secondary" size="sm">
              View Projects
            </Button>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-4">UI/UX Design</h3>
            <p className="text-gray-600 mb-4">Creating intuitive and beautiful user interfaces</p>
            <Button variant="primary" size="sm">
              See Designs
            </Button>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Projects</h2>
        <div className="text-center text-gray-500">프로젝트 소개가 들어갈 영역입니다.</div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Contact</h2>
        <div className="text-center text-gray-500">연락처 또는 연락 폼이 들어갈 영역입니다.</div>
      </section>
    </main>
  );
}
