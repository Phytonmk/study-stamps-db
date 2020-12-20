type Location = {
  volume: string;
  page: number;
  x: number;
  y: number;
};

export const queries = {
  write: {
    addStamp: (
      collection: string,
      section: string,
      year: string,
      price: string,
      color: string,
      country: string,
      volume: string,
      page: string,
      x: string,
      y: string,
      series: string,
      size: string,
      title: string,
      theme: string
    ) => `
BEGIN TRANSACTION;

insert into colors values(default, '${color}') on conflict do nothing;
insert into series values(default, '${series}') on conflict do nothing;
insert into sizes values(default, '${size}') on conflict do nothing;

insert into countries values(default, '${country}') on conflict do nothing;
insert into sections values(default, '${section}') on conflict do nothing;
insert into themes values(default, '${theme}') on conflict do nothing;
insert into collections values(default, '${collection}', (select id from themes where title='${theme}'), (select id from countries where title='${country}'), (select id from sections where title='${section}')) on conflict do nothing;

insert into volumes values(default, '${volume}') on conflict do nothing;
insert into locations values(default, (select id from volumes where title='${volume}'), '${page}', '${x}', '${y}') on conflict do nothing;

insert into stamps values(
    (select id from collections where title='${collection}'),
    (select id from series where title='${series}'),
    ${year},
    (select id from colors where title='${color}'),
    (select id from sizes where title='${size}'),
    ${price},
    (select id from locations where volume=(select id from volumes where title='${volume}') and page=${page} and x=${x} and y=${y}),
    '${title}',
    default
);

COMMIT;
`,
    removeStampsByTheme: (themeId: string) => `
BEGIN TRANSACTION;

delete from stamps using collections
where stamps.collection=collections.id
and collections.theme=${themeId};

COMMIT;
    `,
    updateLocation: (
      stampId: string,
      volume: string,
      page: string,
      x: string,
      y: string
    ) => `
BEGIN TRANSACTION;

insert into volumes values(default, '${volume}') on conflict do nothing;
insert into locations values(default, (select id from volumes where title='${volume}'), '${page}', '${x}', '${y}') on conflict do nothing;

update stamps set
location=(select id from locations where volume=(select id from volumes where title='${volume}') and page=${page} and x=${x} and y=${y})
where id=${stampId};

COMMIT;
`,
  },
  read: {
    stamps: () => `
select

stamps.id as id,
stamps.title as title,
stamps.year as year,
stamps.price as price,
collections.title as collection,
series.title as series,
colors.title as color,
sizes.title as size,
locations.page as page,
locations.x as "x",
locations.y as "y",
volumes.title as volume,
countries.title as country,
sections.title as section

from stamps

left join collections on stamps.collection=collections.id
left join themes on collections.theme=themes.id
left join countries on collections.country=countries.id
left join sections on collections.section=sections.id
left join series on stamps.series=series.id
left join colors on stamps.color=colors.id
left join sizes on stamps.size=sizes.id
left join locations on stamps.location=locations.id
left join volumes on volumes.id=locations.volume
`,
    countriesBySection: (section: string) => `
select distinct
countries.title as country

from collections

left join countries on collections.country=countries.id

where collections.section=(select id from sections where title='${section}');
    `,
    volumesBySeries: (series: string) => `
select distinct
volumes.title as volume

from stamps

left join locations on stamps.location=locations.id
left join volumes on volumes.id=locations.volume
left join series on stamps.series=series.id

where series.title='${series}'
        `,
    locationsByTheme: (theme: string) => `
select
locations.page as page,
locations.x as "x",
locations.y as "y",
volumes.title as volume,
collections.title as collection

from stamps

left join collections on stamps.collection=collections.id
left join themes on collections.theme=themes.id
left join countries on collections.country=countries.id
left join sections on collections.section=sections.id
left join locations on stamps.location=locations.id
left join volumes on volumes.id=locations.volume
where themes.title='${theme}'
        `,
    themeOfSeriesBySize: (size: string) => `
select distinct

series.title as series,
themes.title as theme

from stamps

left join collections on stamps.collection=collections.id
left join themes on collections.theme=themes.id
left join series on stamps.series=series.id
left join sizes on stamps.size=sizes.id

where sizes.title='${size}'
          `,
    countryByLocation: (volume: string, page: number, x: string, y: string) => `
select

countries.title as country

from stamps

left join collections on stamps.collection=collections.id
left join countries on collections.country=countries.id
left join locations on stamps.location=locations.id
left join volumes on volumes.id=locations.volume

where volumes.title='${volume}' and locations.page=${page} and locations.x=${x} and locations.y=${y}
          `,
    countryByTheme: (theme: string) => `
select distinct

countries.title as country

from collections

left join countries on collections.country=countries.id
left join themes on collections.theme=themes.id

where themes.title='${theme}'
        `,
    collectionReport: (collection: string) => ({
      countriesAndThemesBySection: `
select

array_agg(countries.title) as countries,
count(countries.id) as countriesCount,
array_agg(themes.title) as themes,
count(themes.id) as themesCount,
sections.title as sections

from sections
left join collections on collections.section=sections.id
left join themes on collections.theme=themes.id
left join countries on collections.country=countries.id

where collections.title='${collection}'
group by sections.id
`,
      stmapsCountByVolume: `
select
 
count(*) as stampsCount,
countries.title as country,
themes.title as theme

from stamps
left join collections on collections.id=stamps.collection
left join countries on countries.id=collections.country
left join themes on themes.id=collections.theme

where collections.title='${collection}'
group by countries.title, themes.title
`,
      pages: `
select

count(*) as pagesCount,
volumes.title as volume

from stamps
left join collections on collections.id=stamps.collection
left join locations on locations.id=stamps.location
left join volumes on volumes.id=locations.volume

where collections.title='${collection}'
group by volumes.title, collections.title
`,
    }),
  },
};
