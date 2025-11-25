const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

export const mockData = Array.from({ length: 50 }, (_, index) => {
    const genre = genres[index % genres.length]; // Rotate genres evenly

    return {
        id: `${index + 1}`,
        location: index % 2 === 0 ? 'Berlin, Germany' : 'Munich, Germany',
        title: `Mock Event ${index + 1}`,
        description: `This is a mock description for Event ${index + 1}`,
        summary: `${genre} Conference ${index + 1}`, // 👈 Add genre to summary
        start: `2025-06-${(index % 28 + 1).toString().padStart(2, '0')}T10:00:00Z`,
    };
});