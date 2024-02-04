import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { Router } from '@angular/router';
import { JourneyService } from './core/services/journey.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    Router,
    JourneyService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
