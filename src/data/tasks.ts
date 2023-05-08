export type Task = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    subtasks?: Task[];
    deadline: Date;
    difficulty: Difficulty;
    timeEstimate: number;
    likeliness: Likeliness;

    //todo: time estimate can be a sum of subtasks and modified by difficulty
}

enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3,
    ExtraHard = 4
}

enum Likeliness {
    Hate = 1,
    Dislike = 2,
    Neutral = 3,
    Like = 4,
    Love = 5
}

export const tasksList: Task[] = [
    {
        id: 1,
        title: "Learn React",
        description: "Learn React and Redux",
        completed: false,
        subtasks: [
            {
                id: 12,
                title: "Learn React",
                description: "Learn React and Redux",
                completed: false,
                deadline: new Date(2020, 1, 1),
                difficulty: Difficulty.Medium,
                timeEstimate: 10,
                likeliness: Likeliness.Like
            },
            {
                id: 13,
                title: "Learn React",
                description: "Learn React and Redux",
                completed: false,
                deadline: new Date(2020, 1, 1),
                difficulty: Difficulty.Medium,
                timeEstimate: 10,
                likeliness: Likeliness.Like
            },
        ],
        deadline: new Date(2020, 1, 1),
        difficulty: Difficulty.Medium,
        timeEstimate: 10,
        likeliness: Likeliness.Like
    },
    {
        id: 2,
        title: "Learn JS",
        description: "Learn React and Redux",
        completed: false,
        subtasks: [
            {
                id: 22,
                title: "Learn JS",
                description: "Learn React and Redux",
                completed: false,
                deadline: new Date(2020, 1, 1),
                difficulty: Difficulty.Medium,
                timeEstimate: 10,
                likeliness: Likeliness.Like
            },],
        deadline: new Date(2020, 1, 1),
        difficulty: Difficulty.Medium,
        timeEstimate: 10,
        likeliness: Likeliness.Like
    }];


