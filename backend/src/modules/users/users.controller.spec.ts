// src/modules/users/users.controller.spec.ts
// ==========================================
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('JobsController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// ==========================================
