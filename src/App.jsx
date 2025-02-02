import React, { useState, useEffect } from 'react';
import { Terminal, Database, Server, Code, Mail, ExternalLink } from 'lucide-react';

const TerminalPortfolio = () => {
    const [visibleLines, setVisibleLines] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [showPrompt, setShowPrompt] = useState(true);

    const commands = {
        help: {
            output: (
                <div className="text-green-400">
                Available commands:
                <br />• about - Learn about me
                <br />• skills - View my technical skills
                <br />• projects - See my projects
                <br />• contact - Get my contact info
                <br />• clear - Clear the terminal
                </div>
            )
        },
        about: {
            output: (
                <div className="space-y-2">
                <div className="text-blue-400 font-bold text-xl">Backend Developer</div>
                <div className="text-gray-300">
                I'm a Django backend developer with a passion for building robust and scalable web applications.
                I specialize in creating efficient APIs, database optimization, and server-side architecture.
                </div>
                </div>
            )
        },
        skills: {
            output: (
                <div className="space-y-4">
                <div className="text-yellow-400 font-bold">Backend Development</div>
                <div className="grid grid-cols-2 gap-4">
                {[
                    { name: 'Django', level: 90 },
                    { name: 'Python', level: 90 },
                    { name: 'SQL', level: 80 },
                    { name: 'RESTful APIs', level: 85 },
                ].map((skill, index) => (
                    <div key={index} className="bg-gray-800 p-2 rounded">
                    <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                    <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                    />
                    </div>
                    </div>
                ))}
                </div>
                <div className="text-yellow-400 font-bold mt-4">Frontend Skills</div>
                <div className="grid grid-cols-2 gap-4">
                {[
                    { name: 'HTML/CSS', level: 70 },
                    { name: 'JavaScript', level: 65 },
                    { name: 'React', level: 55 },
                    { name: 'Tailwind', level: 50 },
                ].map((skill, index) => (
                    <div key={index} className="bg-gray-800 p-2 rounded">
                    <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                    <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                    />
                    </div>
                    </div>
                ))}
                </div>
                </div>
            )
        },
        projects: {
            output: (
                <div className="space-y-4">
                {[
                    {
                        title: 'E-commerce API',
                        description: 'Built a scalable REST API using Django REST framework',
                        tech: ['Django', 'PostgreSQL', 'Redis', 'Docker'],
                        metrics: '500K+ monthly requests'
                    },
                    {
                        title: 'Authentication System',
                        description: 'Custom authentication system with JWT and social auth',
                        tech: ['Django', 'OAuth2', 'JWT', 'Celery'],
                        metrics: 'Used by 50K+ users'
                    },
                    {
                        title: 'Data Pipeline',
                        description: 'Automated data processing pipeline for analytics',
                        tech: ['Python', 'Apache Airflow', 'PostgreSQL'],
                        metrics: 'Processes 1M+ records daily'
                    }
                ].map((project, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
                    <div className="flex items-center gap-2">
                    <Server className="text-green-500" size={20} />
                    <h3 className="text-green-400 font-bold">{project.title}</h3>
                    </div>
                    <p className="text-gray-300 mt-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-700 text-xs px-2 py-1 rounded">
                        {tech}
                        </span>
                    ))}
                    </div>
                    <div className="text-green-300 text-sm mt-2">
                    {project.metrics}
                    </div>
                    </div>
                ))}
                </div>
            )
        },
        contact: {
            output: (
                <div className="space-y-3">
                {[
                    { icon: <Mail size={20} />, text: 'email@example.com', link: 'mailto:email@example.com' },
                    { icon: <Code size={20} />, text: 'github.com/username', link: 'https://github.com/username' },
                    { icon: <ExternalLink size={20} />, text: 'linkedin.com/in/username', link: 'https://linkedin.com/in/username' }
                ].map((contact, index) => (
                    <a
                    key={index}
                    href={contact.link}
                    className="flex items-center gap-3 bg-gray-800 p-3 rounded hover:bg-gray-700 transition-colors"
                    >
                    {contact.icon}
                    <span>{contact.text}</span>
                    </a>
                ))}
                </div>
            )
        },
        clear: {
            output: null
        }
    };

    useEffect(() => {
        const initialLines = [
            <div key="welcome" className="text-green-400 font-bold">
            Welcome to my terminal portfolio! Type 'help' to see available commands.
            </div>
        ];
        setVisibleLines(initialLines);
    }, []);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const command = currentCommand.toLowerCase().trim();

            const newLine = (
                <div key={visibleLines.length} className="flex gap-2">
                <span className="text-green-500">➜</span>
                <span className="text-purple-400">~</span>
                <span>{currentCommand}</span>
                </div>
            );

            const commandOutput = commands[command]?.output ?? (
                <div className="text-red-400">
                Command not found. Type 'help' to see available commands.
                </div>
            );

            if (command === 'clear') {
                setVisibleLines([]);
            } else {
                setVisibleLines([...visibleLines, newLine, commandOutput]);
            }

            setCurrentCommand('');
            setTimeout(() => {
                const terminal = document.getElementById('terminal');
                terminal.scrollTop = terminal.scrollHeight;
            }, 100);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
        {/* Terminal header */}
        <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center gap-2">
        <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-sm font-mono">
        portfolio.sh
        </div>
        </div>

        {/* Terminal content */}
        <div
        id="terminal"
        className="h-[80vh] overflow-y-auto p-4 font-mono text-sm"
        >
        {visibleLines.map((line, index) => (
            <div key={index} className="mb-2">
            {line}
            </div>
        ))}
        {showPrompt && (
            <div className="flex items-center gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-purple-400">~</span>
            <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent outline-none flex-1"
            autoFocus
            />
            </div>
        )}
        </div>
        </div>
        </div>
        </div>
    );
};

export default TerminalPortfolio;
