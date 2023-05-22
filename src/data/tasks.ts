export type Task = {
    id: number;
    name: string;
    description?: string;
    priority: number;
    difficulty: Difficulty;
    likeliness: Likeliness;
    deadline: Date;
    timeEstimate: number;
    completionTime?: number;
    isSubtask: boolean;
    isParent: boolean;
    isCompleted: boolean;
    parentId?: number;

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
        name: "Task 1",
        description: "This is a task",
        priority: 1,
        difficulty: Difficulty.Easy,
        likeliness: Likeliness.Love,
        deadline: new Date(),
        timeEstimate: 1,
        isSubtask: false,
        isParent: false,
        isCompleted: false
    },
    {
        id: 2,
        name: "Task 2",
        description: "This is a task",
        priority: 1,
        difficulty: Difficulty.Easy,
        likeliness: Likeliness.Love,
        deadline: new Date(),
        timeEstimate: 1,
        isSubtask: false,
        isParent: false,
        isCompleted: false
    }
    ];

export const getTasks = () => {
    return tasksList;
}

