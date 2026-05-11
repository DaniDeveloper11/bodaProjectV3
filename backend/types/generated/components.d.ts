import type { Schema, Struct } from '@strapi/strapi';

export interface EventBankDetails extends Struct.ComponentSchema {
  collectionName: 'components_event_bank_details';
  info: {
    displayName: 'bank-detail';
    icon: 'gift';
  };
  attributes: {
    accountHolder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Firstname Lastname'>;
    accountNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2760430463'>;
    bankName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'BBVA'>;
  };
}

export interface EventContact extends Struct.ComponentSchema {
  collectionName: 'components_event_contacts';
  info: {
    displayName: 'contact';
    icon: 'user';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contacta al novio'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'+52 3314857062'>;
    whatsappUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventHotel extends Struct.ComponentSchema {
  collectionName: 'components_event_hotels';
  info: {
    displayName: 'hotel';
  };
  attributes: {
    address: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface EventMapLocation extends Struct.ComponentSchema {
  collectionName: 'components_event_map_locations';
  info: {
    displayName: 'map-location';
    icon: 'pinMap';
  };
  attributes: {
    directionUrl: Schema.Attribute.String;
    iconImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    latitude: Schema.Attribute.Float & Schema.Attribute.Required;
    longitude: Schema.Attribute.Float & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventParentGroup extends Struct.ComponentSchema {
  collectionName: 'components_event_parent_groups';
  info: {
    displayName: 'parent-group';
    icon: 'puzzle';
  };
  attributes: {
    fatherName: Schema.Attribute.String & Schema.Attribute.Required;
    motherName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventTimeline extends Struct.ComponentSchema {
  collectionName: 'components_event_timelines';
  info: {
    displayName: 'timeline';
    icon: 'bulletList';
  };
  attributes: {
    iconImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    time: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'01:00 PM'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Misa Religiosa'>;
  };
}

export interface SectionsContacts extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts';
  info: {
    displayName: 'contacts';
    icon: 'bulletList';
  };
  attributes: {
    contactList: Schema.Attribute.Component<'event.contact', true>;
  };
}

export interface SectionsDressCode extends Struct.ComponentSchema {
  collectionName: 'components_sections_dress_codes';
  info: {
    displayName: 'dress-code';
    icon: 'shirt';
  };
  attributes: {
    mainImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    manDescription: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vestimenta elegante'>;
    menColors: Schema.Attribute.JSON;
    menOutfitImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    menRestriction: Schema.Attribute.String;
    womenColors: Schema.Attribute.JSON;
    womenDescription: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vestidos florales, colores claros o tonos coloridos'>;
    womenOutfitImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    womenRestrictions: Schema.Attribute.String;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'gallery';
    icon: 'picture';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SectionsGifts extends Struct.ComponentSchema {
  collectionName: 'components_sections_gifts';
  info: {
    displayName: 'gifts';
    icon: 'gift';
  };
  attributes: {
    bankDetails: Schema.Attribute.Component<'event.bank-details', true>;
    registryUrl: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'apps';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SectionsMap extends Struct.ComponentSchema {
  collectionName: 'components_sections_maps';
  info: {
    displayName: 'map';
    icon: 'picture';
  };
  attributes: {
    locations: Schema.Attribute.Component<'event.map-location', true>;
    regionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Etzatlan Jalisco'>;
  };
}

export interface SectionsNames extends Struct.ComponentSchema {
  collectionName: 'components_sections_names';
  info: {
    displayName: 'names';
    icon: 'heart';
  };
  attributes: {
    name1: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nombre Novia'>;
    name2: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nombre Noviof'>;
  };
}

export interface SectionsParents extends Struct.ComponentSchema {
  collectionName: 'components_sections_parents';
  info: {
    displayName: 'parents';
    icon: 'user';
  };
  attributes: {
    introText: Schema.Attribute.RichText;
    parentGroups: Schema.Attribute.Component<'event.parent-group', true>;
  };
}

export interface SectionsRecommendedHotels extends Struct.ComponentSchema {
  collectionName: 'components_sections_recommended_hotels';
  info: {
    displayName: 'Recommended Hotels';
    icon: 'house';
  };
  attributes: {
    hotetels: Schema.Attribute.Component<'event.hotel', true>;
    Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hoteles Recomendados'>;
  };
}

export interface SectionsStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_stories';
  info: {
    displayName: 'story';
    icon: 'earth';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    mainImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'UNA PROMESA PARA TODA LA VIDA'>;
  };
}

export interface SectionsTimeline extends Struct.ComponentSchema {
  collectionName: 'components_sections_timelines';
  info: {
    displayName: 'timeline';
    icon: 'oneToOne';
  };
  attributes: {
    bottomImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    events: Schema.Attribute.Component<'event.timeline', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'event.bank-details': EventBankDetails;
      'event.contact': EventContact;
      'event.hotel': EventHotel;
      'event.map-location': EventMapLocation;
      'event.parent-group': EventParentGroup;
      'event.timeline': EventTimeline;
      'sections.contacts': SectionsContacts;
      'sections.dress-code': SectionsDressCode;
      'sections.gallery': SectionsGallery;
      'sections.gifts': SectionsGifts;
      'sections.hero': SectionsHero;
      'sections.map': SectionsMap;
      'sections.names': SectionsNames;
      'sections.parents': SectionsParents;
      'sections.recommended-hotels': SectionsRecommendedHotels;
      'sections.story': SectionsStory;
      'sections.timeline': SectionsTimeline;
    }
  }
}
