import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import AssessmentRequestPopup from '../components/AssessmentRequestPopup';
import { Brain, Users, Target, Award, Clock, CheckCircle } from 'lucide-react';

const assessmentTypes = [
  'Technical Skills Assessment',
  'Problem Solving Assessment', 
  'Communication Skills Assessment',
  'Leadership Assessment',
  'Team Collaboration Assessment',
  'Industry Knowledge Assessment',
  'Coding Assessment',
  'System Design Assessment',
  'Behavioral Assessment',
  'Cultural Fit Assessment'
];

const Assessment: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleRequestAssessment = (type: string) => {
    setSelectedType(type);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Comprehensive Assessments
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Evaluate talent with precision using our scientifically designed assessment tools
          </p>
        </div>
      </Section>

      {/* Assessment Types */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Assessment Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentTypes.map((type) => (
              <Card key={type} className="p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-start mb-4">
                  <Target className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                  <h3 className="text-xl font-semibold">{type}</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Comprehensive evaluation designed to measure specific competencies and skills
                </p>
                <Button 
                  onClick={() => handleRequestAssessment(type)}
                  className="w-full"
                >
                  Request Assessment
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Assessments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 rounded-full bg-purple-500/20 border border-purple-500/30 inline-block mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert-Designed</h3>
              <p className="text-gray-400">
                Created by industry professionals with deep domain expertise
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-full bg-green-500/20 border border-green-500/30 inline-block mb-4">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Validated Results</h3>
              <p className="text-gray-400">
                Scientifically validated to ensure accurate and reliable outcomes
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-full bg-orange-500/20 border border-orange-500/30 inline-block mb-4">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-400">
                Get detailed results and insights within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Assessment Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Select Type</h3>
              <p className="text-gray-400 text-sm">Choose the appropriate assessment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-gray-400 text-sm">Book a convenient time slot</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Assessment</h3>
              <p className="text-gray-400 text-sm">Complete the evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-gray-400 text-sm">Receive detailed report</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 border-blue-500/30">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Assess Talent?</h2>
            <p className="text-gray-300 mb-6">
              Get started with our comprehensive assessment solutions today
            </p>
            <Button 
              onClick={() => setShowPopup(true)}
              size="lg"
              className="px-8"
            >
              Request Assessment
            </Button>
          </Card>
        </div>
      </Section>

      {/* Assessment Request Popup */}
      {showPopup && (
        <AssessmentRequestPopup 
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          assessmentType={selectedType}
        />
      )}
    </div>
  );
};

export default Assessment;
