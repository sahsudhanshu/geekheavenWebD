import React from 'react';
import type { Question } from '../types';

type QuestionItemProps = {
    question: Question;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
    return (
        <a
            href={question.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
            <p className="text-gray-700">{question.title}</p>
        </a>
    );
};

export default QuestionItem;
