import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  imports: [],
  providers: [StorageService],
})
export class StorageModule {}
