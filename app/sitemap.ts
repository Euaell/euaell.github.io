import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://euaell.github.io/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0
        },
        {
            url: 'https://euaell.github.io/#about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0
        },
        {
            url: 'https://euaell.github.io/#experience',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: 'https://euaell.github.io/#education',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: 'https://euaell.github.io/#projects',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: 'https://euaell.github.io/#contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6
        },
    ]
}
